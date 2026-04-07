import { useState, useCallback } from 'react';

/**
 * useToolHistory - A reusable hook for persisting recent tool activity in localStorage.
 *
 * @param {string} toolKey  - Unique key for the tool (e.g. 'qr-generator')
 * @param {number} maxItems - Max history entries to keep (default: 5)
 *
 * Returns:
 *   history    - Array of recent history items (newest first)
 *   addToHistory(item) - Call this to save a new item to history
 *   clearHistory()     - Wipe all saved history for this tool
 */
const useToolHistory = (toolKey, maxItems = 5) => {
  const storageKey = `toolbite-history-${toolKey}`;

  const readHistory = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [history, setHistory] = useState(readHistory);

  const addToHistory = useCallback((item) => {
    setHistory(prev => {
      // Avoid duplicate consecutive entries
      if (prev.length > 0 && JSON.stringify(prev[0]) === JSON.stringify(item)) {
        return prev;
      }
      const updated = [
        { ...item, savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ...prev
      ].slice(0, maxItems);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // Ignore quota errors gracefully
      }
      return updated;
    });
  }, [storageKey, maxItems]);

  const clearHistory = useCallback(() => {
    localStorage.removeItem(storageKey);
    setHistory([]);
  }, [storageKey]);

  return { history, addToHistory, clearHistory };
};

export default useToolHistory;
