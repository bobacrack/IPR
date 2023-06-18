package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.SQLException;

@SpringBootApplication
public class TenterSpringBootApplication {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://217.160.215.31:64000/tenter?sslmode=disable";
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
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        SpringApplication.run(TenterSpringBootApplication.class, args);
    }
}
