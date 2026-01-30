# ToDarija

ToDarija is a web application for automatic translation of text into Darija (Moroccan Arabic) using Google Gemini API. The project provides a Java REST API (JAX-RS) and a modern web interface for easy translation and text correction.

## Main Features
- Automatic translation of text into Darija (Moroccan Arabic)
- Spelling and grammar correction of the source text
- Secure RESTful API (Java, Jakarta EE)
- Web interface and browser extension for client-side usage

## Project Architecture
```
ToDarija/
├── application/ToDarija/         # Java backend (REST API, services, models)
│   ├── src/main/java/org/project # Main source code (API, controllers, services, strategies)
│   ├── src/main/resources        # Config files (application.properties, beans.xml)
│   └── pom.xml                  # Maven dependencies
├── translator-client/           # Web client and browser extension
│   ├── web/                     # Web interface (HTML, JS, CSS)
│   └── extension/               # Browser extension (Chrome/Firefox)
├── docs/images/                 # Images and examples
└── README.md                    # This file
```

## Installation & Launch


### Prerequisites
- Java 21 or higher
- Maven 3.8+
- Gemini API key (Google)

#### Configuration
Add your Gemini API key in the file:

`application/ToDarija/src/main/resources/application.properties`

Example:
```properties
gemini.api.key=YOUR_GEMINI_API_KEY
```

### Backend (Java API)
```bash
cd application/ToDarija
mvn clean package
# Deploy the generated WAR file to a Jakarta EE compatible server (Tomcat, Payara, etc.)
```

### Frontend (Web/Extension)
Open the `translator-client/web/` folder in a browser or load the `translator-client/extension/` folder as an unpacked extension in Chrome/Firefox.

## Usage Example

![Usage Example](docs/images/exemple.png)

1. Enter text in French or Classical Arabic.
2. The app corrects the text and automatically translates it into Darija.
3. The result is displayed instantly.

## Main Folder Structure
- `application/ToDarija/`: Java REST API, translation logic, Gemini integration
- `translator-client/web/`: User web interface
- `translator-client/extension/`: Browser extension
- `docs/images/`: Images and screenshots

## Technologies Used
- Java 21, Jakarta EE (JAX-RS, CDI)
- Maven
- Google Gemini API (via google-genai)
- HTML, CSS, JavaScript (frontend)

## Author
Abdelkarim AOUAD

## License
This project is open-source under the Apache 2.0 license.

---

## Learn More

- [Contribution Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Design Patterns Used](DESIGN_PATTERNS.md)