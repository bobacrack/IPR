package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

public class TenterSpringBootApplication {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://localhost:64000/tenter";
        String username = "tenter";
        String password = "tenter";

        DatabaseConnector connector = new DatabaseConnector(url, username, password);

        try {
            connector.connect();

            // Use the connection to perform database operations
            Connection connection = connector.getConnection();
            // Execute queries, insert/update/delete data, etc.

            connector.disconnect();
        } catch (SQLException e) {
            e.printStackTrace();
        }

       SpringApplication.run(TenterSpringBootApplication.class, args);
    }
}
