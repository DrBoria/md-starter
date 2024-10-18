const debounce = <T extends (...arguments_: any[]) => void>(targetFunction: T, delay: number) => {
    let timerId: ReturnType<typeof setTimeout> | null;
  
    return (...passedArguments: Parameters<T>) => {
      if (timerId) {
        clearTimeout(timerId);
      }
  
      timerId = setTimeout(() => {
        targetFunction(...passedArguments);
        timerId = null;
      }, delay);
    };
  };
  
export { debounce };
