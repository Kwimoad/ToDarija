package org.project.service;

import org.project.strategy.*;

/**
 * Factory to get the right InputProcessor for a given type.
 */
public class ProcessorFactory {

    /**
     * Get processor for the given type.
     *
     * @param type input type (e.g. "text")
     * @return InputProcessor for the type
     * @throws IllegalArgumentException if type is not supported
     */
    public static InputProcessor getProcessor(String type) {
        switch(type.toLowerCase()) {
            case "text": return new TextProcessor();
            default: throw new IllegalArgumentException("Unsupported type");
        }
    }

}