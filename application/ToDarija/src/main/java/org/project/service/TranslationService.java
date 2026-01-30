package org.project.service;

import jakarta.ws.rs.core.Response;
import org.project.api.TranslateAPI;
import org.project.strategy.InputProcessor;

import java.util.Map;

/**
 * Service layer entry point for translation requests exposed to controllers.
 */
public class TranslationService {

    /**
     * Validate, clean, and translate the input request.
     *
     * @param request map with 'type' and 'input'
     * @return HTTP response with translation or error
     */
    public static Response translate(Map<String, String> request){

        String type = request.get("type");
        Object input = request.get("input");

        if(input == null || input.toString().trim().isEmpty()){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", "Input is required"))
                    .build();
        }

        if(type==null || type.trim().isEmpty()){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", "Type is required"))
                    .build();
        }

        try{

            InputProcessor inputProcessor = ProcessorFactory.getProcessor(type);
            String cleanText = inputProcessor.processor(input);
            Response darijaResponse = TranslateAPI.translateToDarija(cleanText);

            return darijaResponse;

        }catch (IllegalArgumentException e){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }

    }

}