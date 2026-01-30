# Design Patterns Used in ToDarija

## Singleton
- `ClientApiKey`: Ensures a single instance of the Gemini client throughout the application.

## Factory
- `ProcessorFactory`: Dynamically selects the input processing strategy based on the text type.

## Strategy
- `InputProcessor` (and its implementations): Allows easy addition of new preprocessing types.

## Controller (MVC)
- `TranslateController`: Separates presentation logic (REST API) from business logic (services).

## Custom Exception
- `NullPointerClient`: Fine-grained error handling for Gemini client issues.

These patterns make it easy to add new features without modifying the system core.
