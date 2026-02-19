package com.Samved.Hackathon.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class MongoDBConnectionTest implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MongoDBConnectionTest.class);

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        try {
            // Test MongoDB connection
            String dbName = mongoTemplate.getDb().getName();
            logger.info("===========================================");
            logger.info("✅ MongoDB Connection Successful!");
            logger.info("Connected to database: {}", dbName);
            logger.info("Collections available: {}", mongoTemplate.getCollectionNames());
            logger.info("===========================================");
        } catch (Exception e) {
            logger.error("===========================================");
            logger.error("❌ MongoDB Connection Failed!");
            logger.error("Error: {}", e.getMessage());
            logger.error("===========================================");
        }
    }
}

