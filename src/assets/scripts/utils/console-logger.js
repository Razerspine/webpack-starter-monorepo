export default class ConsoleLogger {
  success(message) {
    console.log(`%c✅ ${message}`, "color: #34d399; background: #18181b; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 500;");
  }

  warning(message) {
    console.log(`%c⚠️ ${message}`, "color: #facc15; background: #18181b; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 500;");
  }

  error(message) {
    console.log(`%c❌ ${message}`, "color: #f87171; background: #18181b; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 500;");
  }
}
