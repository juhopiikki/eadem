package com.eadem.mental.configuration;

import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class PostgresConfiguration {
  private static HikariConfig config = new HikariConfig();
  private static HikariDataSource ds;

  static {
    config.setJdbcUrl("jdbc:postgresql://localhost:5432/mental");
    config.setDriverClassName("org.postgresql.Driver");
    config.setUsername("mental");
    config.setPassword("mental");
    config.addDataSourceProperty("cachePrepStmts", "true");
    config.addDataSourceProperty("prepStmtCacheSize", "250");
    config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
    ds = new HikariDataSource(config);
  }

  @Bean
  public DataSource dataSource() {
    return ds;
  }

  @Bean
  public JdbcTemplate jdbcTemplate(DataSource dataSource) {
    JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
    jdbcTemplate.setResultsMapCaseInsensitive(true);
    return jdbcTemplate;
  }

}
