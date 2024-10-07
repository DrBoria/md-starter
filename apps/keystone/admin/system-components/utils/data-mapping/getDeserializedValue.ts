interface ISerealizedValue {
  value?:
    | ISerealizedValue
    | { inner?: ISerealizedValue; value?: ISerealizedValue }
    | unknown;
}

const getDeserializedValue = (serealizedValue: ISerealizedValue | null) => {
  if (!serealizedValue) return null;

  // @ts-ignore - ignore errors cause of possible primitive value for serealizedValue
  let value = serealizedValue?.value?.value?.value;
  // @ts-ignore - same
  if (!value) value = serealizedValue?.value?.inner?.value;
  if (!value) value = serealizedValue?.value;
  if (!value) return serealizedValue;
  return value;
};

export { getDeserializedValue, ISerealizedValue };
