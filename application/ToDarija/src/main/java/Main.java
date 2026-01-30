import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

/**
 * @author AOUAD Abdelkarim
 * @version 1.0.0
 */

@ApplicationPath("/api")
public class Main extends Application {
	/**
	 * Bootstraps the JAX-RS application and exposes resources under /api.
	 */
}