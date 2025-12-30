import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const cleanAndLimitText = (htmlContent, maxLength = 280) => {
    const cleanText = htmlContent.replace(/<[^>]*>/g, '');
    const trimmedText = cleanText.replace(/\s+/g, ' ').trim();
    if (trimmedText.length <= maxLength) {
        return trimmedText;
    }
    return trimmedText.substring(0, maxLength).trim() + '...';
}