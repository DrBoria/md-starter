interface ISerializedValue {
  value?:
  | ISerializedValue
  | { inner?: ISerializedValue; value?: ISerializedValue }
  | unknown;
}

const isSerializedValue = (val: unknown): val is ISerializedValue => {
  return typeof val === 'object' && val !== null;
};

const getDeserializedValue = (serializedValue: ISerializedValue | null) => {
  if (serializedValue === null || serializedValue === undefined) return null;
  let value;

  // Level 3 nesting
  if (
    isSerializedValue(serializedValue.value) &&
    isSerializedValue(serializedValue.value.value)
  ) {
    value = serializedValue.value.value.value;
  }

  // Number check on Level 2
  if (
    (value === null || value === undefined) &&
    isSerializedValue(serializedValue.value) &&
    typeof serializedValue.value.value === "number"
  ) {
    value = serializedValue.value.value;
  }

  // Inner value check
  if (value === null || value === undefined) {
    const valValue = serializedValue.value;
    if (isSerializedValue(valValue) && 'inner' in valValue) {
      const inner = (valValue as { inner?: ISerializedValue }).inner;
      if (inner) {
        value = inner.value;
      }
    }
  }

  if (value === null || value === undefined) value = serializedValue.value;
  if (value === null || value === undefined) return serializedValue;

  return value;
};

export { getDeserializedValue };
export type { ISerializedValue };
