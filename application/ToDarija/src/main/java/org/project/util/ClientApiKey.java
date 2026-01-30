package org.project.util;

import com.google.genai.Client;
import org.project.exception.NullPointerClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Singleton to create and provide a Gemini client using the API key from properties.
 */
public class ClientApiKey {

    private static ClientApiKey instance;
    private Client client;

    /**
     * Create the Gemini client from properties file.
     *
     * @throws IOException if properties file or key is missing
     * @throws NullPointerClient if client creation fails
     */
    private ClientApiKey() throws IOException, NullPointerClient {
        try (
                InputStream input = ClientApiKey.class.getClassLoader().getResourceAsStream("application.properties");
                ){
            Properties props = new Properties();
            props.load(input);
            String key = props.getProperty("gemini.api.key");
            client = Client.builder()
                    .apiKey(key)
                    .build();
            if(client==null){
                throw new NullPointerClient("Failed to create Gemini client");
            }
        }catch (IOException e){
            throw new IOException("key doesnt existe");
        }
    }

    /**
     * Get the singleton instance.
     *
     * @return ClientApiKey instance
     */
    public static synchronized ClientApiKey getInstance() {
        if (instance == null) {
            try {
                instance = new ClientApiKey();
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (NullPointerClient e) {
                throw new RuntimeException(e);
            }
        }
        return instance;
    }

    /**
     * Get the Gemini client.
     *
     * @return Gemini client or null if failed
     */
    public Client getClient() {
        return client;
    }

}
