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
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    value = ((serializedValue?.value as ISerializedValue)?.value as ISerializedValue)?.value;
  if (
    (value === null || value === undefined) &&
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    typeof (serializedValue?.value as ISerializedValue)?.value === "number"
  ) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    value = (serializedValue?.value as ISerializedValue)?.value;
  }
  if (value === null || value === undefined)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    value =
      (serializedValue?.value as { inner?: ISerializedValue })?.inner?.value;
  if (value === null || value === undefined) value = serializedValue?.value;
  if (value === null || value === undefined) value = serializedValue?.value;
  if (value === null || value === undefined) return serializedValue;

  return value;
};

export { getDeserializedValue };
export type { ISerializedValue };
