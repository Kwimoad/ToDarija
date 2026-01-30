package org.project.exception;


/**
 * Exception for Gemini client null pointer errors.
 */
public class NullPointerClient extends NullPointerException {
    /**
     * Create exception with a message.
     * @param msg error message
     */
    public NullPointerClient(String msg) {
        super(msg);
    }
}
