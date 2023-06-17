package org.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {
    private Connection connection;
    private String url;
    private String username;
    private String password;

    public DatabaseConnector(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    public void connect() throws SQLException, ClassNotFoundException {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("Failed to load the PostgreSQL JDBC driver.");
            e.printStackTrace();
            return;
        }

        // Proceed with establishing a database connection
        try {
            connection = DriverManager.getConnection(url, username, password);
            // Use the connection for database operations
        } catch (SQLException e) {
            System.out.println("Failed to establish a database connection.");
            e.printStackTrace();
        }
    }


    public void disconnect() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }

    // Other database operations can be implemented here

    public Connection getConnection() {
        return connection;
    }
}
