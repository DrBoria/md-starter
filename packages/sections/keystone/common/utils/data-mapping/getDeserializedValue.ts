interface ISerializedValue {
  value?:
    | ISerializedValue
    | { inner?: ISerializedValue; value?: ISerializedValue }
    | unknown;
}

const getDeserializedValue = (serializedValue: ISerializedValue | null) => {
  if (serializedValue === null || serializedValue === undefined) return null;
  let value;
  if (value === null || value === undefined)
    // @ts-ignore - ignore errors because of possible primitive value for serializedValue
    value = serializedValue?.value?.value?.value;
  if (
    (value === null || value === undefined) &&
    // @ts-ignore - fix for integer type's
    typeof serializedValue?.value?.value === "number"
  ) {
    // @ts-ignore - fix for integer type's
    value = serializedValue?.value?.value;
  }
  if (value === null || value === undefined)
    // @ts-ignore - same
    value = serializedValue?.value?.inner?.value;
  if (value === null || value === undefined) value = serializedValue?.value;
  if (value === null || value === undefined) value = serializedValue?.value;
  if (value === null || value === undefined) return serializedValue;

  return value;
};

export { getDeserializedValue, ISerializedValue };
