const debounce = <T extends (...args: Parameters<T>) => void>(
  targetFunction: T,
  delay: number,
) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return (...passedArguments: Parameters<T>): void => {
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
