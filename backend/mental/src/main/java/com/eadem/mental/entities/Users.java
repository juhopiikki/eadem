package com.eadem.mental.entities;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class Users {

  public UUID usersid = UUID.randomUUID();
  public String username = "Anonym";
  public String location = "Earth";
  public String description = "Citizen of earth";

  private static JdbcTemplate jdbcTemplate;

  @Autowired
  public void setDataSource(DataSource dataSource) {
    jdbcTemplate = new JdbcTemplate(dataSource);
  }

  public static class UsersRowMapper implements RowMapper<Users> {
    @Override
    public Users mapRow(ResultSet rs, int rowNum) throws SQLException {
      final Users saved = new Users();
      saved.usersid = rs.getObject("usersid", UUID.class);
      saved.username = rs.getString("username");
      saved.location = rs.getString("location");
      saved.description = rs.getString("description");
      return saved;
    }
    
  }

  public static Users getById(UUID id) {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM users WHERE "
          + "users.usersid=?",
          new Object[]{ id }, 
          new UsersRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static Users getRandom() {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM users ORDER BY random() LIMIT 1",
          new Object[]{ }, 
          new UsersRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public boolean create() {
    try {
      return jdbcTemplate.update(
          "INSERT INTO users "
          + "(usersid, username, location, description) "
          + "VALUES (?, ?, ?, ?)",
         usersid, username, location, description
      ) > 0;
    } catch (DataAccessException e) {
      e.printStackTrace();
      return false;
    }
  }

}
