import { EditorConfigurationSchema } from "../../../../documents/editor/core";
import type { TEditorConfiguration } from "../../../../documents/editor/core";

type TResult =
  | { error: string; data?: undefined }
  | { data: TEditorConfiguration; error?: undefined };

export default function validateTextAreaValue(value: string): TResult {
  // 先檢查是否為空
  if (!value || value.trim() === '') {
    return { error: "Empty input" };
  }

  let jsonObject = undefined;
  
  try {
    jsonObject = JSON.parse(value);
  } catch (error) {
    console.error("JSON parse error:", error);
    return { error: "Invalid JSON format" };
  }

  // 檢查 jsonObject 是否為 null 或 undefined
  if (!jsonObject || typeof jsonObject !== 'object') {
    return { error: "Invalid JSON: must be an object" };
  }

  console.info("jsonObject", jsonObject);

  // 檢查 schema 是否存在
  if (!EditorConfigurationSchema) {
    console.error("EditorConfigurationSchema is undefined");
    return { error: "Schema validation failed: Schema not found" };
  }

  try {
    const parseResult = EditorConfigurationSchema.safeParse(jsonObject);

    if (!parseResult.success) {
      console.error("Schema validation error:", parseResult.error);
      return { error: `Invalid schema: ${parseResult.error.issues[0]?.message || 'Unknown error'}` };
    }

    if (!parseResult.data.root) {
      return { error: 'Missing "root" node' };
    }

    return { data: parseResult.data };
  } catch (error) {
    console.error("Unexpected validation error:", error);
    return { error: "Schema validation failed" };
  }
}
