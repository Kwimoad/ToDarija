package org.project.strategy;

/**
 * Interface for processing input before translation.
 */
public interface InputProcessor {

    /**
     * Process input before translation.
     *
     * @param input input to process
     * @return processed input
     */
    String processor(Object input);
}