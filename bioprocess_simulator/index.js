class SimulatorJS {
    constructor({
                    failure_probability_percent = 5.0,
                    normal_lead_time_mean = 30,
                    normal_lead_time_std = 10,
                    anomalous_lead_time_mean = 250,
                    anomalous_lead_time_std = 50,
                    initial_stock = 15,
                    restocking_policy = 'monthly',
                    reorder_threshold_percentage = 50,
                    order_quantity = 5,
                    anomalous_conditions = false,
                    hybrid_scenario = false,
                    simulation_days = 360,
                    verbose = true,
                    expiry_days_seeders = 21 * 30,
                    expiry_days_fermentators = 30 * 3,
                    expiry_days_primary_recovers = 24 * 30,
                    expiry_days_purificators = 16 * 30,
                    use_lead_time_variance = false,
                    log_callback = (message) => console.log(message),
                    update_chart_callback = (data) => {}, // Placeholder, actual update logic will be on the page
                    room_temperature_capacity = 10,
                    cold_storage_capacity = 10,
                    hybrid_anomalous_percentage = 33.33 // Default to 1/3 of the time anomalous
                } = {}) {
        this.failure_probability = failure_probability_percent / 100.0;
        this.normal_lead_time = { mean: normal_lead_time_mean, std: normal_lead_time_std };
        this.anomalous_lead_time = { mean: anomalous_lead_time_mean, std: anomalous_lead_time_std };
        this.anomalous_conditions = anomalous_conditions;
        this.use_lead_time_variance = use_lead_time_variance;

        this.expiry_days = {
            seeders: expiry_days_seeders,
            fermentators: expiry_days_fermentators,
            primary_recovers: expiry_days_primary_recovers,
            purificators: expiry_days_purificators
        };

        this.cost_per_unit = {
            seeders: 270000,
            fermentators: 15000,
            primary_recovers: 47000,
            purificators: 10800
        };

        this.storage_type = {
            seeders: 'room_temperature',
            primary_recovers: 'room_temperature',
            fermentators: 'cold_storage',
            purificators: 'cold_storage'
        };

        this.storage_capacity = {
            room_temperature: room_temperature_capacity,
            cold_storage: cold_storage_capacity
        };

        this.storage_usage = {
            room_temperature: 0,
            cold_storage: 0
        };

        this.hybrid_scenario = hybrid_scenario;
        this.hybrid_change_days = null;
        this.hybrid_anomalous_percentage = hybrid_anomalous_percentage;
        let initial_log_message_for_hybrid = "";

        if (this.hybrid_scenario) {
            const anomalous_duration = Math.round(simulation_days * (this.hybrid_anomalous_percentage / 100));
            const remaining_days = simulation_days - anomalous_duration;
            const normal_duration_part1 = Math.floor(remaining_days / 2);
            const normal_duration_part2 = remaining_days - normal_duration_part1;

            this.hybrid_change_days = [
                normal_duration_part1 + 1, // Day to switch to anomalous
                normal_duration_part1 + anomalous_duration + 1 // Day to switch back to normal
            ];

            // If the first normal period is 0 days, start in anomalous conditions.
            this.anomalous_conditions = (normal_duration_part1 === 0);

            initial_log_message_for_hybrid = `🚀 Initializing simulator with DYNAMIC HYBRID conditions: ` +
                                           `${normal_duration_part1} normal days, ` +
                                           `${anomalous_duration} anomalous days (${this.hybrid_anomalous_percentage}%), ` +
                                           `${normal_duration_part2} normal days.`;
        } else {
            // Existing logic for non-hybrid anomalous conditions
            this.anomalous_conditions = anomalous_conditions;
        }

        this.stock = {
            seeders: [],
            fermentators: [],
            primary_recovers: [],
            purificators: []
        };

        this.total_cost = 0;

        if (initial_stock > 0) {
            const base_quantity = Math.floor(initial_stock / 4);
            const remainder = initial_stock % 4;
            let quantities = {
                seeders: base_quantity,
                fermentators: base_quantity,
                primary_recovers: base_quantity,
                purificators: base_quantity
            };
            const type_keys = Object.keys(this.stock);
            for (let i = 0; i < remainder; i++) {
                quantities[type_keys[i]] += 1;
            }

            for (const [stock_type, quantity] of Object.entries(quantities)) {
                if (quantity > 0) {
                    this.stock[stock_type].push({
                        quantity: quantity,
                        expiry_day: this.expiry_days[stock_type]
                    });
                    const storage_type = this.storage_type[stock_type];
                    this.storage_usage[storage_type] += quantity;
                    this.total_cost += quantity * this.cost_per_unit[stock_type];
                }
            }
        }

        this.initial_stock_quantities = {
            seeders: this._get_total_stock('seeders'),
            fermentators: this._get_total_stock('fermentators'),
            primary_recovers: this._get_total_stock('primary_recovers'),
            purificators: this._get_total_stock('purificators')
        };

        this.order_quantity = order_quantity;
        this.restocking_policy = restocking_policy;
        this.reorder_threshold_percentage = reorder_threshold_percentage;

        this.current_day = 0;
        this.active_processes = [];
        this.pending_orders = [];
        this.pending_stock = {
            seeders: 0,
            fermentators: 0,
            primary_recovers: 0,
            purificators: 0
        };

        this.expired_products = {
            seeders: 0,
            fermentators: 0,
            primary_recovers: 0,
            purificators: 0
        };

        this.productivity = 0;
        this.daily_productivity = 0;
        this.daily_history_for_charts = [];
        this.simulation_days = simulation_days;

        this.total_failures = 0;
        this.waiting_days = 0;
        this.processes_started = 0;
        this.productive_days_set = new Set();

        this.verbose = verbose;
        this.log_callback = log_callback;
        this.update_chart_callback = update_chart_callback;

        if (this.verbose) {
            if (this.hybrid_scenario) {
                this.log(initial_log_message_for_hybrid);
            } else {
                this.log(`🚀 Initializing simulator with ${this.anomalous_conditions ? 'anomalous' : 'normal'} conditions`);
            }
            this.log(`📋 Restocking policy: ${this.restocking_policy}`);
            this.log(`🧪 Initial stock: seeders=${this._get_total_stock('seeders')}, fermentators=${this._get_total_stock('fermentators')}, primary_recovers=${this._get_total_stock('primary_recovers')}, purificators=${this._get_total_stock('purificators')}`);
            this.log(`📦 Order quantity: ${this.order_quantity}`);
            this.log(`🏪 Storage usage: room_temperature=${this.storage_usage['room_temperature']}/${this.storage_capacity['room_temperature']} units, cold_storage=${this.storage_usage['cold_storage']}/${this.storage_capacity['cold_storage']} units`);
            this.log(`📊 Reorder threshold: ${this.reorder_threshold_percentage}% (based on initial count)`);
            this.log(`⚠️ Daily failure probability: ${failure_probability_percent}%`);
        }
    }

    log(message) {
        if (this.verbose) {
            this.log_callback(message);
        }
    }

    _random_gauss(mean, std) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num * std + mean;
        return num;
    }

    _get_total_stock(stock_type) {
        return this.stock[stock_type].reduce((sum, batch) => sum + batch.quantity, 0);
    }

    _get_storage_available(storage_type) {
        return this.storage_capacity[storage_type] - this.storage_usage[storage_type];
    }

    _get_lead_time() {
        const { mean, std } = this.anomalous_conditions ? this.anomalous_lead_time : this.normal_lead_time;
        if (this.use_lead_time_variance) {
            return Math.max(1, Math.round(this._random_gauss(mean, std)));
        } else {
            return Math.max(1, Math.round(mean));
        }
    }

    _calculate_max_order_quantity(stock_type) {
        const storage_type_for_item = this.storage_type[stock_type];
        const current_usage = this.storage_usage[storage_type_for_item];
        const available_space = this.storage_capacity[storage_type_for_item] - current_usage;
        return Math.max(0, Math.floor(available_space));
    }

    _place_order(stock_type, ignore_pending_stock = false) {
        if (ignore_pending_stock || this.pending_stock[stock_type] === 0) {
            const max_order_quantity = this._calculate_max_order_quantity(stock_type);
            const order_quantity_to_place = Math.min(this.order_quantity, max_order_quantity);

            if (order_quantity_to_place > 0) {
                const lead_time = this._get_lead_time();
                const due_day = this.current_day + lead_time;
                const expiry_day_of_order = due_day + this.expiry_days[stock_type];
                const cost = order_quantity_to_place * this.cost_per_unit[stock_type];

                this.pending_orders.push({
                    due_day: due_day,
                    quantity: order_quantity_to_place,
                    stock_type: stock_type,
                    expiry_day: expiry_day_of_order,
                    cost: cost
                });
                this.pending_stock[stock_type] += order_quantity_to_place;
                this.total_cost += cost;

                this.log(`Day ${this.current_day}: 📦 Order placed for ${order_quantity_to_place} units of ${stock_type} for $${cost.toLocaleString()}. Will arrive on day ${due_day} and expire on day ${expiry_day_of_order}`);
            } else {
                this.log(`Day ${this.current_day}: ⚠️ Cannot order ${stock_type} due to storage constraints. Current ${this.storage_type[stock_type]} usage: ${this.storage_usage[this.storage_type[stock_type]]}/${this.storage_capacity[this.storage_type[stock_type]]} units`);
            }
        } else {
            this.log(`Day ${this.current_day}: ⏳ There are already ${this.pending_stock[stock_type]} units of ${stock_type} waiting to be received, no new order placed (Threshold policy check)`);
        }
    }

    _check_restocking() {
        if (this.current_day === 0 && this.restocking_policy !== 'threshold') return;

        const policies = {
            monthly: 30,
            quarterly: 90,
            semiannual: 180,
        };

        if (this.restocking_policy in policies) {
            if (this.current_day > 0 && this.current_day % policies[this.restocking_policy] === 0) {
                this.log(`Day ${this.current_day}: 🗓️ ${this.restocking_policy} restocking check triggered.`);
                for (const stock_type of Object.keys(this.stock)) {
                    this._place_order(stock_type, true);
                }
            }
        } else if (this.restocking_policy === 'threshold') {
            for (const stock_type of Object.keys(this.stock)) {
                const initial_q = this.initial_stock_quantities[stock_type] || 0;
                const threshold_val = initial_q * (this.reorder_threshold_percentage / 100);
                const available = this._get_total_stock(stock_type);
                const available_and_pending = available + this.pending_stock[stock_type];

                if (available_and_pending <= threshold_val) {
                    this._place_order(stock_type, false);
                }
            }
        }
    }

    _process_orders() {
        const remaining_pending_orders = [];
        for (const order of this.pending_orders) {
            if (order.due_day === this.current_day) {
                const { stock_type, quantity, expiry_day } = order;
                this.stock[stock_type].push({ quantity, expiry_day });
                this.stock[stock_type].sort((a, b) => a.expiry_day - b.expiry_day);

                const storage_type_for_item = this.storage_type[stock_type];
                this.storage_usage[storage_type_for_item] += quantity;

                this.pending_stock[stock_type] = Math.max(0, this.pending_stock[stock_type] - quantity);

                this.log(`Day ${this.current_day}: 📬 Received ${quantity} units of ${stock_type} expiring on day ${expiry_day}. Current stock: ${this._get_total_stock(stock_type)}`);
                this.log(`   Storage ${storage_type_for_item} usage: ${this.storage_usage[storage_type_for_item]}/${this.storage_capacity[storage_type_for_item]} units (+${quantity} units)`);
            } else {
                remaining_pending_orders.push(order);
            }
        }
        this.pending_orders = remaining_pending_orders;
    }

    _check_and_remove_expired_stock() {
        for (const stock_type of Object.keys(this.stock)) {
            const unexpired_batches = [];
            let expired_quantity_today = 0;
            for (const batch of this.stock[stock_type]) {
                if (batch.expiry_day <= this.current_day) {
                    expired_quantity_today += batch.quantity;
                    this.expired_products[stock_type] += batch.quantity;
                    const storage_type_for_item = this.storage_type[stock_type];
                    this.storage_usage[storage_type_for_item] -= batch.quantity;
                } else {
                    unexpired_batches.push(batch);
                }
            }
            if (expired_quantity_today > 0) {
                this.log(`Day ${this.current_day}: 🗑️ ${expired_quantity_today} units of ${stock_type} have expired and been discarded`);
                const storage_type_for_item = this.storage_type[stock_type];
                this.log(`   Storage ${storage_type_for_item} usage: ${this.storage_usage[storage_type_for_item]}/${this.storage_capacity[storage_type_for_item]} units (-${expired_quantity_today} units)`);
            }
            this.stock[stock_type] = unexpired_batches;
        }
    }

    _consume_stock(stock_type, quantity_to_consume = 1) {
        if (this._get_total_stock(stock_type) < quantity_to_consume) {
            return false;
        }

        this.stock[stock_type].sort((a, b) => a.expiry_day - b.expiry_day);

        let consumed_count = 0;
        const updated_batches = [];
        let consumed_from_storage = 0;

        for (const batch of this.stock[stock_type]) {
            if (consumed_count === quantity_to_consume) {
                updated_batches.push(batch);
                continue;
            }

            const can_consume_from_batch = Math.min(batch.quantity, quantity_to_consume - consumed_count);

            if (batch.quantity > can_consume_from_batch) {
                updated_batches.push({
                    quantity: batch.quantity - can_consume_from_batch,
                    expiry_day: batch.expiry_day
                });
            }

            consumed_count += can_consume_from_batch;
            consumed_from_storage += can_consume_from_batch;
        }

        if (consumed_count === quantity_to_consume) {
            this.stock[stock_type] = updated_batches;
            const storage_type_for_item = this.storage_type[stock_type];
            this.storage_usage[storage_type_for_item] -= consumed_from_storage;
            return true;
        }
        return false;
    }

    _check_hybrid_scenario_changes() {
        if (!this.hybrid_scenario || !this.hybrid_change_days) return;

        // Check if it's time to switch to anomalous conditions
        if (this.current_day === this.hybrid_change_days[0] && this.hybrid_change_days[0] <= this.simulation_days) {
            // Ensure we only switch if not already anomalous and the change day is valid
            if (!this.anomalous_conditions) {
                this.anomalous_conditions = true;
                this.log(`⚠️ Day ${this.current_day}: SWITCHING TO ANOMALOUS CONDITIONS (Hybrid Scenario)`);
                this.log(`⚠️ Lead time now follows distribution with mean=${this.anomalous_lead_time.mean}, std=${this.anomalous_lead_time.std}`);
            }
        // Check if it's time to switch back to normal conditions
        } else if (this.current_day === this.hybrid_change_days[1] && this.hybrid_change_days[1] <= this.simulation_days) {
            // Ensure we only switch if currently anomalous and the change day is valid
            if (this.anomalous_conditions) {
                this.anomalous_conditions = false;
                this.log(`✅ Day ${this.current_day}: RETURNING TO NORMAL CONDITIONS (Hybrid Scenario)`);
                this.log(`✅ Lead time now follows distribution with mean=${this.normal_lead_time.mean}, std=${this.normal_lead_time.std}`);
            }
        }
    }

    _spawn_new_process(process_type) {
        if (process_type === 'seed') {
            if (this._get_total_stock('seeders') > 0) {
                if (this._consume_stock('seeders')) {
                    this.processes_started++;
                    this.log(`Day ${this.current_day}: 🌱 Starting new seed process (remaining seeders: ${this._get_total_stock('seeders')})`);
                    this.log(`   Storage ${this.storage_type['seeders']} usage: ${this.storage_usage[this.storage_type['seeders']]}/${this.storage_capacity[this.storage_type['seeders']]} units`);
                    return { state: 'seed', days_left: 3, waiting_for: null, id: this.processes_started };
                }
            }
        }
        return null;
    }

    _transition_from_seed_success(process) {
        if (this._get_total_stock('fermentators') > 0) {
            if (this._consume_stock('fermentators')) {
                process.state = 'fermentation';
                process.days_left = 9;
                this.log(`Day ${this.current_day}: ✅ Seed (ID ${process.id}) completed. Starting fermentation (rem fermentators: ${this._get_total_stock('fermentators')})`);
                this.log(`   Storage ${this.storage_type['fermentators']} usage: ${this.storage_usage[this.storage_type['fermentators']]}/${this.storage_capacity[this.storage_type['fermentators']]} units`);
            } else {
                process.state = 'waiting';
                process.waiting_for = 'fermentators';
                process.next_state = 'fermentation';
                process.next_days = 9;
                this.log(`Day ${this.current_day}: ✅ Seed (ID ${process.id}) completed, but no fermentators available. Waiting.`);
            }
        } else {
            process.state = 'waiting';
            process.waiting_for = 'fermentators';
            process.next_state = 'fermentation';
            process.next_days = 9;
            this.log(`Day ${this.current_day}: ✅ Seed (ID ${process.id}) completed, but no fermentators available. Waiting.`);
        }
    }

    _handle_fermentation(process) {
        const fermentation_duration = 9.0;
        const prob_no_fail_total_op = 1.0 - this.failure_probability;
        const prob_no_fail_daily_ferm = Math.pow(prob_no_fail_total_op, 1.0 / fermentation_duration);
        const prob_fail_daily_ferm = 1.0 - prob_no_fail_daily_ferm;
        let spawned_parallel_process = null;

        if (Math.random() < prob_fail_daily_ferm) {
            process.state = 'fermentation_penalty';
            process.days_left = 5;
            this.total_failures++;
            this.log(`Day ${this.current_day}: ❌ Failure in fermentation (ID ${process.id}). 5 days penalty`);
        } else {
            process.days_left--;
            if (process.days_left <= 0) {
                if (this._get_total_stock('primary_recovers') > 0) {
                    if (this._consume_stock('primary_recovers')) {
                        process.state = 'primary_recovery';
                        process.days_left = 1;
                        this.log(`Day ${this.current_day}: ✅ Fermentation (ID ${process.id}) completed. Starting primary_recovery (rem primary_recovers: ${this._get_total_stock('primary_recovers')})`);
                        this.log(`   Storage ${this.storage_type['primary_recovers']} usage: ${this.storage_usage[this.storage_type['primary_recovers']]}/${this.storage_capacity[this.storage_type['primary_recovers']]} units`);

                        if (this.active_processes.filter(p => p.state !== 'fermentation_penalty' && p.state !== 'seed_penalty').length < 2) {
                            spawned_parallel_process = this._spawn_new_process('seed');
                            if(spawned_parallel_process) this.log(`Day ${this.current_day}: 🔄 (Post-fermentation ID ${process.id}) Starting parallel seed process (ID ${spawned_parallel_process.id})`);
                        }
                    } else {
                        process.state = 'waiting'; process.waiting_for = 'primary_recovers'; process.next_state = 'primary_recovery'; process.next_days = 1;
                    }
                } else {
                    process.state = 'waiting';
                    process.waiting_for = 'primary_recovers';
                    process.next_state = 'primary_recovery';
                    process.next_days = 1;
                    this.log(`Day ${this.current_day}: ⚠️ Fermentation (ID ${process.id}) completed but no primary_recovers. Waiting`);
                }
            }
        }
        return spawned_parallel_process;
    }

    _handle_primary_recovery(process) {
        let should_remove = false;
        if (Math.random() < this.failure_probability) {
            this.total_failures++;
            this.log(`Day ${this.current_day}: ❌ Failure in primary_recovery (ID ${process.id}). Product lost`);
            should_remove = true;
        } else {
            if (this._get_total_stock('purificators') > 0) {
                if (this._consume_stock('purificators')) {
                    process.state = 'purification';
                    process.days_left = 1;
                    this.log(`Day ${this.current_day}: ✅ Primary recovery (ID ${process.id}) completed. Starting purification (rem purificators: ${this._get_total_stock('purificators')})`);
                    this.log(`   Storage ${this.storage_type['purificators']} usage: ${this.storage_usage[this.storage_type['purificators']]}/${this.storage_capacity[this.storage_type['purificators']]} units`);
                } else {
                    process.state = 'waiting'; process.waiting_for = 'purificators'; process.next_state = 'purification'; process.next_days = 1;
                }
            } else {
                process.state = 'waiting';
                process.waiting_for = 'purificators';
                process.next_state = 'purification';
                process.next_days = 1;
                this.log(`Day ${this.current_day}: ⚠️ Primary recovery (ID ${process.id}) completed but no purificators. Waiting`);
            }
        }
        return should_remove;
    }

    _handle_purification(process) {
        if (Math.random() < this.failure_probability) {
            this.total_failures++;
            this.log(`Day ${this.current_day}: ❌ Failure in purification (ID ${process.id}). Product lost`);
        } else {
            this.productivity++;
            this.daily_productivity++;
            this.log(`Day ${this.current_day}: 🎉 Successful purification (ID ${process.id}). Total productivity: ${this.productivity}`);
        }
        return true;
    }

    async* run() {
        this.log(`🏁 Starting simulation of ${this.simulation_days} days...`);
        this.current_day = 1;
        this.daily_history_for_charts = [];
        this.active_processes = [];

        if (this.active_processes.length === 0) {
            const new_initial_process = this._spawn_new_process('seed');
            if (new_initial_process) {
                this.active_processes.push(new_initial_process);
            }
        }

        while (this.current_day <= this.simulation_days) {
            this.daily_productivity = 0;

            if (this.hybrid_scenario) {
                this._check_hybrid_scenario_changes();
            }

            this._check_and_remove_expired_stock();
            this._process_orders();
            this._check_restocking();

            let is_day_productive = false;
            let waiting_processes_today = 0;
            const new_processes_spawned_this_day = [];

            const processes_to_keep_for_next_day = [];

            for (let process of this.active_processes) {
                let should_remove_process_flag = false;
                let is_process_active_today = true;

                if (process.state === 'waiting') {
                    const resource_type = process.waiting_for;
                    if (this._get_total_stock(resource_type) > 0) {
                        if (this._consume_stock(resource_type)) {
                            process.state = process.next_state;
                            process.days_left = process.next_days;
                            process.waiting_for = null;
                            this.log(`Day ${this.current_day}: ▶️ Resuming process (ID ${process.id}) in state ${process.state} (rem ${resource_type}: ${this._get_total_stock(resource_type)})`);
                        } else {
                            waiting_processes_today++;
                            is_process_active_today = false;
                        }
                    } else {
                        waiting_processes_today++;
                        is_process_active_today = false;
                    }
                }

                if (process.state !== 'waiting') {
                    switch (process.state) {
                        case 'seed':
                            const seeding_duration = 3.0;
                            const prob_fail_daily_seed = 1.0 - Math.pow(1.0 - this.failure_probability, 1.0 / seeding_duration);
                            if (Math.random() < prob_fail_daily_seed) {
                                process.state = 'seed_penalty';
                                process.days_left = 1;
                                this.total_failures++;
                                is_process_active_today = false;
                                this.log(`Day ${this.current_day}: ❌ Failure in seed (ID ${process.id}). Adding 1 day penalty.`);
                            } else {
                                process.days_left--;
                                if (process.days_left <= 0) {
                                    this._transition_from_seed_success(process);
                                }
                            }
                            break;
                        case 'seed_penalty':
                            process.days_left--;
                            is_process_active_today = false;
                            if (process.days_left <= 0) {
                                this.log(`Day ${this.current_day}: 🔄 Seed penalty (ID ${process.id}) completed. Attempting fermentation.`);
                                if (this._get_total_stock('fermentators') > 0) {
                                    if (this._consume_stock('fermentators')) {
                                        process.state = 'fermentation';
                                        process.days_left = 9;
                                        this.log(`   Storage ${this.storage_type['fermentators']} usage: ${this.storage_usage[this.storage_type['fermentators']]}/${this.storage_capacity[this.storage_type['fermentators']]} units`);
                                    } else {
                                        process.state = 'waiting'; process.waiting_for = 'fermentators'; process.next_state = 'fermentation'; process.next_days = 9;
                                    }
                                } else {
                                    process.state = 'waiting'; process.waiting_for = 'fermentators'; process.next_state = 'fermentation'; process.next_days = 9;
                                    this.log(`Day ${this.current_day}:   No fermentators for (ID ${process.id}). Waiting.`);
                                }
                            }
                            break;
                        case 'fermentation':
                            const new_parallel_proc = this._handle_fermentation(process);
                            if(new_parallel_proc) new_processes_spawned_this_day.push(new_parallel_proc);
                            break;
                        case 'fermentation_penalty':
                            process.days_left--;
                            is_process_active_today = false;
                            if (process.days_left <= 0) {
                                const new_p = this._spawn_new_process('seed');
                                if (new_p) {
                                    new_processes_spawned_this_day.push(new_p);
                                    this.log(`Day ${this.current_day}: 🔄 Fermentation penalty (ID ${process.id}) completed. Restarting from seed (new ID ${new_p.id}).`);
                                }
                                should_remove_process_flag = true;
                            }
                            break;
                        case 'primary_recovery':
                            process.days_left--;
                            if (process.days_left <= 0) {
                                should_remove_process_flag = this._handle_primary_recovery(process);
                            }
                            break;
                        case 'purification':
                            process.days_left--;
                            if (process.days_left <= 0) {
                                should_remove_process_flag = this._handle_purification(process);
                            }
                            break;
                    }
                }

                if (is_process_active_today && process.state !== 'waiting' && process.state !== 'seed_penalty' && process.state !== 'fermentation_penalty') {
                    is_day_productive = true;
                }

                if (!should_remove_process_flag) {
                    processes_to_keep_for_next_day.push(process);
                }
            }

            this.active_processes = processes_to_keep_for_next_day.concat(new_processes_spawned_this_day);

            this.waiting_days += waiting_processes_today;
            if (is_day_productive) {
                this.productive_days_set.add(this.current_day);
            }

            if (this.active_processes.length === 0) {
                const new_process = this._spawn_new_process('seed');
                if (new_process) {
                    this.active_processes.push(new_process);
                }
            }

            const failure_ratio = this.processes_started > 0 ? this.total_failures / this.processes_started : 0;
            const total_stock_count = Object.values(this.stock).reduce((sum, type_stock) => sum + type_stock.reduce((s, batch) => s + batch.quantity, 0), 0);

            const daily_data = {
                day: this.current_day,
                daily_productivity: this.daily_productivity,
                cumulative_productivity: this.productivity,
                is_anomalous: this.anomalous_conditions,
                active_processes_count: this.active_processes.length,
                waiting_processes_today: waiting_processes_today,
                is_day_productive: is_day_productive,
                stock_seeders: this._get_total_stock('seeders'),
                stock_fermentators: this._get_total_stock('fermentators'),
                stock_primary_recovers: this._get_total_stock('primary_recovers'),
                stock_purificators: this._get_total_stock('purificators'),
                total_stock_count: total_stock_count,
                room_temp_usage: this.storage_usage.room_temperature,
                cold_storage_usage: this.storage_usage.cold_storage,
                total_cost: this.total_cost,
                failure_ratio: failure_ratio,
                total_failures: this.total_failures,
                expired_seeders: this.expired_products.seeders,
                expired_fermentators: this.expired_products.fermentators,
                expired_primary_recovers: this.expired_products.primary_recovers,
                expired_purificators: this.expired_products.purificators,
                pending_stock_seeders: this.pending_stock.seeders,
                pending_stock_fermentators: this.pending_stock.fermentators,
                pending_stock_primary_recovers: this.pending_stock.primary_recovers,
                pending_stock_purificators: this.pending_stock.purificators,
                config_room_temperature_capacity: this.storage_capacity.room_temperature,
                config_cold_storage_capacity: this.storage_capacity.cold_storage,
                config_hybrid_anomalous_percentage: this.hybrid_scenario ? this.hybrid_anomalous_percentage : null
            };
            this.daily_history_for_charts.push(daily_data);

            yield daily_data;

            this.current_day++;
        }

        this.log("🏁 Simulation ended.");
        this._log_final_summary();
        return this.get_final_results();
    }

    _log_final_summary() {
        const final_failure_ratio = this.processes_started > 0 ? this.total_failures / this.processes_started : 0;
        const total_productive_days = this.productive_days_set.size;
        const efficiency = this.simulation_days > 0 ? total_productive_days / this.simulation_days : 0;

        this.log("🏆 === FINAL SUMMARY ===");
        this.log(`📈 Total productivity: ${this.productivity}`);
        this.log(`🧪 Final stock:`);
        this.log(`   - Seeders: ${this._get_total_stock('seeders')}`);
        this.log(`   - Fermentators: ${this._get_total_stock('fermentators')}`);
        this.log(`   - Primary recovers: ${this._get_total_stock('primary_recovers')}`);
        this.log(`   - Purificators: ${this._get_total_stock('purificators')}`);
        this.log(`   - Total: ${Object.keys(this.stock).reduce((sum, type) => sum + this._get_total_stock(type), 0)}`);
        this.log(`🗑️ Expired products:`);
        this.log(`   - Seeders: ${this.expired_products.seeders}`);
        this.log(`   - Fermentators: ${this.expired_products.fermentators}`);
        this.log(`   - Primary recovers: ${this.expired_products.primary_recovers}`);
        this.log(`   - Purificators: ${this.expired_products.purificators}`);
        this.log(`   - Total: ${Object.values(this.expired_products).reduce((sum, val) => sum + val, 0)}`);
        this.log(`🏪 Storage usage:`);
        this.log(`   - Room temperature: ${this.storage_usage.room_temperature}/${this.storage_capacity.room_temperature} units`);
        this.log(`   - Cold storage: ${this.storage_usage.cold_storage}/${this.storage_capacity.cold_storage} units`);
        this.log(`💰 Total cost: $${this.total_cost.toLocaleString()}`);
        this.log(`📦 Pending stock to be received: ${Object.values(this.pending_stock).reduce((sum, val) => sum + val, 0)}`);
        this.log(`⚙️ Active processes at end: ${this.active_processes.length}`);
        this.log(`⏱️ Total waiting days: ${this.waiting_days}`);
        this.log(`❌ Total failures: ${this.total_failures}`);
        this.log(`📊 Failure ratio: ${(final_failure_ratio * 100).toFixed(2)}% (${this.total_failures}/${this.processes_started})`);
        this.log(`Efficiency: ${(efficiency * 100).toFixed(2)}% (${total_productive_days} productive days / ${this.simulation_days} total days)`);
        this.log("🏆 ====================");
    }

    get_final_results() {
        const final_failure_ratio = this.processes_started > 0 ? this.total_failures / this.processes_started : 0;
        const total_productive_days = this.productive_days_set.size;
        const efficiency = this.simulation_days > 0 ? total_productive_days / this.simulation_days : 0;
        const productive_day_percentage = efficiency * 100;

        return {
            config_failure_probability_percent: this.failure_probability * 100.0,
            config_normal_lead_time_mean: this.normal_lead_time.mean,
            config_normal_lead_time_std: this.normal_lead_time.std,
            config_anomalous_lead_time_mean: this.anomalous_lead_time.mean,
            config_anomalous_lead_time_std: this.anomalous_lead_time.std,
            config_initial_stock_total_input: Object.values(this.initial_stock_quantities).reduce((sum, v) => sum + v, 0),
            config_restocking_policy: this.restocking_policy,
            config_reorder_threshold_percentage: this.reorder_threshold_percentage,
            config_order_quantity: this.order_quantity,
            config_anomalous_conditions_at_start: this.hybrid_scenario ? false : this.anomalous_conditions,
            config_hybrid_scenario: this.hybrid_scenario,
            config_simulation_days: this.simulation_days,
            config_use_lead_time_variance: this.use_lead_time_variance,
            config_room_temperature_capacity: this.storage_capacity.room_temperature,
            config_cold_storage_capacity: this.storage_capacity.cold_storage,
            config_hybrid_anomalous_percentage: this.hybrid_scenario ? this.hybrid_anomalous_percentage : null,
            initial_stock_distribution: this.initial_stock_quantities,

            productivity: this.productivity,
            total_cost: this.total_cost,
            total_failures: this.total_failures,
            processes_started: this.processes_started,
            failure_ratio: final_failure_ratio,
            waiting_days: this.waiting_days,
            total_productive_days: total_productive_days,
            efficiency: efficiency,
            productive_day_percentage: productive_day_percentage,

            final_stock_seeders: this._get_total_stock('seeders'),
            final_stock_fermentators: this._get_total_stock('fermentators'),
            final_stock_primary_recovers: this._get_total_stock('primary_recovers'),
            final_stock_purificators: this._get_total_stock('purificators'),
            final_stock_total: Object.keys(this.stock).reduce((sum, type) => sum + this._get_total_stock(type), 0),

            final_pending_stock_total: Object.values(this.pending_stock).reduce((sum, val) => sum + val, 0),
            final_pending_stock_seeders: this.pending_stock.seeders,
            final_pending_stock_fermentators: this.pending_stock.fermentators,
            final_pending_stock_primary_recovers: this.pending_stock.primary_recovers,
            final_pending_stock_purificators: this.pending_stock.purificators,

            total_expired_seeders: this.expired_products.seeders,
            total_expired_fermentators: this.expired_products.fermentators,
            total_expired_primary_recovers: this.expired_products.primary_recovers,
            total_expired_purificators: this.expired_products.purificators,
            total_expired_all_types: Object.values(this.expired_products).reduce((sum, val) => sum + val, 0),

            final_room_temperature_usage: this.storage_usage.room_temperature,
            final_cold_storage_usage: this.storage_usage.cold_storage,
            active_processes_at_end: this.active_processes.length,

            daily_history: this.daily_history_for_charts
        };
    }
}

/*
Example Usage (in an HTML file with a script tag, or another JS module):

async function main() {
    const logsContainer = document.getElementById('logs');
    const appendLog = (message) => {
        const p = document.createElement('p');
        p.textContent = message;
        logsContainer.appendChild(p);
        logsContainer.scrollTop = logsContainer.scrollHeight;
    };

    const simulationParams = {
        failure_probability_percent: 1,
        simulation_days: 100,
        initial_stock: 20,
        order_quantity: 10,
        restocking_policy: 'threshold',
        reorder_threshold_percentage: 20,
        use_lead_time_variance: true,
        hybrid_scenario: true,
        verbose: true,
        log_callback: appendLog,
    };

    const simulator = new SimulatorJS(simulationParams);
    const simRunner = simulator.run();

    for await (const dailyData of simRunner) {
        // console.log(`Day ${dailyData.day} processed. Prod: ${dailyData.cumulative_productivity}`);
        // await new Promise(resolve => setTimeout(resolve, 50));
    }

    const finalResults = simulator.get_final_results();
    console.log("Final Results:", finalResults);
    appendLog("--- SIMULATION COMPLETE ---");
    // Beautify the JSON output in the log
    const formattedResults = JSON.stringify(finalResults, null, 2);
    const pre = document.createElement('pre');
    pre.textContent = formattedResults;
    logsContainer.appendChild(pre);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

// HTML Example:
// <button onclick="main()">Start Simulation</button>
// <div id="logs" style="height: 400px; width: 600px; overflow-y: scroll; border: 1px solid #ccc; font-family: monospace; font-size: 0.9em; padding: 10px; white-space: pre-wrap;"></div>
*/
