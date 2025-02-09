export function toBytes<T>(state: T): Uint8Array {
  return new TextEncoder().encode(JSON.stringify(state));
}

export function fromBytes<T>(bytes: Uint8Array): T {
  return JSON.parse(new TextDecoder().decode(bytes)) as T;
}
