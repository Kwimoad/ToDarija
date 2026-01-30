package org.project.authentification;

import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;


/**
 * Simple authentication filter for Bearer tokens.
 */
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthFilter implements ContainerRequestFilter {

    /**
     * Filter requests for Bearer token.
     *
     * @param request request context
     */
    @Override
    public void filter(ContainerRequestContext request) {
        String auth = request.getHeaderString("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            request.abortWith(
                    Response.status(401)
                            .entity("Unauthorized")
                            .build()
            );
        }
    }
}
