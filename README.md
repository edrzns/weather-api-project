# ⚡ Concurrent API Weather Fetcher

## Project Overview

This script refactors an initial synchronous weather data fetching mechanism to utilize modern JavaScript concurrency patterns. The primary goal was to fetch current weather data from two different APIs (**OpenWeatherMap** and **WeatherAPI**) simultaneously, compare their response times, and provide robust, contextual error handling.

## 🛠️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/edrzns/weather-api-project.git
    ```
2.  **Install dependencies:** This script relies on `dotenv` to manage API keys.
    ```bash
    npm install dotenv
    ```
3.  **Configure Environment:** Create a `.env` file in the root directory with your API keys:
    ```
    OPEN_WEATHER_API_KEY=your_open_weather_key
    WEATHER_API_KEY=your_weather_api_key
    ```
4.  **Run the script:**
    ```bash
    node waetherApi.js
    ```

## Technical Summary & Implementation Details

The solution successfully leverages **`Promise.all()`** inside an **`async` function** to execute both API calls concurrently.

| Feature | Implementation | Notes |
| :--- | :--- | :--- |
| **Parallel Execution** | `await Promise.all([...])` | Fetches data from both APIs simultaneously for speed. |
| **Speed Logging** | `timePromise` wrapper function | Measures and attaches the duration (in ms) to the result of each API promise before resolution. |
| **Clear Error Handling** | Individual `.catch()` blocks | Each promise chain includes a `.catch()` that throws a descriptive error, clearly identifying which API failed before the error is caught by the main `try...catch` block. |
| **Flow Control** | `async/await` and `try...catch` | Provides clean, readable control flow for the asynchronous operation. |

---

## 📚 Learning Reflection

### What I Learned

1.  **Parallel Fetching with `Promise.all()`:** Gained practical experience using `Promise.all()` to manage multiple asynchronous operations concurrently, significantly improving script execution time.
2.  **Modern Async Control Flow:** Solidified understanding of the `async/await` syntax and how it simplifies the reading and writing of promise-based code compared to traditional `.then()` chaining.
3.  **Contextual Error Handling:** Learned how to use individual `.catch()` blocks within a promise chain to inject descriptive error messages, ensuring the final `try...catch` provides meaningful context about the failure source.

### What Surprised Me

* **Necessity of the Wrapper Function:** I was surprised that to measure individual response speeds within a `Promise.all()` structure, I needed to implement a custom `timePromise` wrapper. This demonstrated that while `Promise.all()` collects data, external logic is required to inject metadata like timing.
* **Early Error Interception:** It was unexpected that robust error messages required adding specific `.catch()` logic to the individual `fetch` calls. I initially thought the main `try...catch` block would be sufficient to identify the failing API, but I learned the importance of **attaching context** to the error *before* it propagates.

### My Struggles

* **Understanding `async/await` Scope:** Figuring out how to properly use the `await` keyword, which required placing the logic inside a function explicitly marked as `async`, was initially confusing.
* **Implementing the Promise Wrapper:** Developing the `timePromise` utility was challenging, as it required changing what the promise ultimately resolves with (from raw JSON data to a new object containing `{name, data, duration}`), but was essential for meeting the speed logging criterion.