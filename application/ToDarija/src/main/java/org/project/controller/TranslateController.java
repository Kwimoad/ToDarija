package org.project.controller;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.project.service.TranslationService;

import java.util.Map;

/**
 * REST controller for handling translation requests.
 */
@Path("/Translate")
public class TranslateController {

    /**
     * Handle translation requests (expects JSON with 'type' and 'input').
     *
     * @param request translation request data
     * @return HTTP response with translation result
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response translate(Map<String, String> request){
        return TranslationService.translate(request);
    }

}
