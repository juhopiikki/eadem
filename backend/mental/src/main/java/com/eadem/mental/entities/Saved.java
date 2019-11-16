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
public class Saved {

  public UUID savedid = UUID.randomUUID();

  private static JdbcTemplate jdbcTemplate;

  @Autowired
  public void setDataSource(DataSource dataSource) {
    jdbcTemplate = new JdbcTemplate(dataSource);
  }

  public static class SavedRowMapper implements RowMapper<Saved> {
    @Override
    public Saved mapRow(ResultSet rs, int rowNum) throws SQLException {
      final Saved saved = new Saved();
      saved.savedid = rs.getObject("savedid", UUID.class);
      return saved;
    }
    
  }

  public static Saved getById(UUID id) {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM saved WHERE "
          + "saved.savedid=?",
          new Object[]{ id }, 
          new SavedRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

}
