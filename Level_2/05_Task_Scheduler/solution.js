
/**
 * L2_05: Concurrent Task Scheduler.
 */
class TaskScheduler {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.runningCount = 0;
        this.queue = [];
    }

    async addTask(taskFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ taskFn, resolve, reject });
            this.runNext();
        });
    }

    runNext() {
        if (this.runningCount >= this.concurrency || this.queue.length === 0) {
            return;
        }

        this.runningCount++;
        const { taskFn, resolve, reject } = this.queue.shift();

        taskFn()
            .then(resolve)
            .catch(reject)
            .finally(() => {
                this.runningCount--;
                this.runNext();
            });
    }
}

// --- Test Suite ---
const scheduler = new TaskScheduler(2); // Max 2 tasks at once

const createTask = (id, duration) => async () => {
    console.log(`⏳ Task ${id} starting (will take ${duration}ms)...`);
    await new Promise(r => setTimeout(r, duration));
    console.log(`✅ Task ${id} finished!`);
    return `Result ${id}`;
};

console.log("Adding 5 tasks to scheduler (Concurrency=2)...");
scheduler.addTask(createTask(1, 1000));
scheduler.addTask(createTask(2, 500));
scheduler.addTask(createTask(3, 300));
scheduler.addTask(createTask(4, 800));
scheduler.addTask(createTask(5, 200));
