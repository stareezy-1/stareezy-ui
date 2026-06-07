/**
 * Token serialization and deserialization for Quasify UI.
 * Enables tokens to be persisted, transmitted, and reconstructed without loss of identity.
 */

import type { Token } from "./token";

/**
 * Error thrown when `deserializeToken` receives invalid input.
 * The `input` field contains the original string for debugging.
 */
export class TokenDeserializationError extends Error {
  public readonly input: string;

  constructor(message: string, input: string) {
    super(message);
    this.name = "TokenDeserializationError";
    this.input = input;
    // Restore prototype chain for instanceof checks in transpiled environments
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Serializes a `Token<T>` to a JSON string.
 *
 * @param token - The token to serialize
 * @returns A JSON string representation of the token
 */
export function serializeToken<T>(token: Token<T>): string {
  return JSON.stringify(token);
}

/**
 * Reconstructs a `Token<T>` from a JSON string produced by `serializeToken`.
 *
 * @param json - The JSON string to deserialize
 * @returns The reconstructed `Token<T>`
 * @throws {TokenDeserializationError} if the input is not valid JSON,
 *   is missing the `__token` field, or is missing/has a non-string `id`
 */
export function deserializeToken<T>(json: string): Token<T> {
  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    throw new TokenDeserializationError(
      `Failed to deserialize token: invalid JSON. Received: ${json}`,
      json,
    );
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    (parsed as Record<string, unknown>).__token !== true
  ) {
    throw new TokenDeserializationError(
      `Failed to deserialize token: missing or invalid "__token" field. Received: ${json}`,
      json,
    );
  }

  const obj = parsed as Record<string, unknown>;

  if (!("id" in obj) || typeof obj.id !== "string") {
    throw new TokenDeserializationError(
      `Failed to deserialize token: missing or non-string "id" field. Received: ${json}`,
      json,
    );
  }

  return parsed as Token<T>;
}
