import { useState, useRef, useCallback } from 'react';

/**
 * useDragDrop - A reusable hook for drag-and-drop file uploads.
 *
 * @param {Function} onFileDrop - Callback fired with the dropped FileList.
 * @param {Object}   options
 * @param {string}   options.accept - Comma-separated MIME types (e.g. 'image/*', 'application/pdf')
 * @param {boolean}  options.multiple - Whether multiple files are accepted (default: false)
 *
 * Returns:
 *   isDragging   - true while files are being dragged over the zone
 *   dragProps    - spread these onto the drop zone div
 */
const useDragDrop = (onFileDrop, { accept = '*/*', multiple = false } = {}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const isValidType = useCallback((file) => {
    if (accept === '*/*') return true;
    const acceptTypes = accept.split(',').map(t => t.trim());
    return acceptTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', '/'));
      }
      return file.type === type || file.name.endsWith(type.replace('*', ''));
    });
  }, [accept]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = Array.from(e.dataTransfer.files);
    const validFiles = multiple ? files.filter(isValidType) : [files.find(isValidType)].filter(Boolean);

    if (validFiles.length > 0) {
      // Create a synthetic FileList-like structure
      const dataTransfer = new DataTransfer();
      validFiles.forEach(f => dataTransfer.items.add(f));
      onFileDrop(dataTransfer.files);
    }
  }, [onFileDrop, multiple, isValidType]);

  return {
    isDragging,
    dragProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
};

export default useDragDrop;
