package com.eadem.mental.entities;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
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
  public UUID usersid = null;
  public UUID recordid = null;

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
      saved.usersid = rs.getObject("usersid", UUID.class);
      saved.recordid = rs.getObject("recordid", UUID.class);
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

  public static Saved getRandom() {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM saved ORDER BY random() LIMIT 1",
          new Object[]{ }, 
          new SavedRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public boolean create() {
    try {
      return jdbcTemplate.update(
          "INSERT INTO saved "
          + "(savedid, usersid, recordid) "
          + "VALUES (?, ?, ?)",
         savedid, usersid, recordid
      ) > 0;
    } catch (DataAccessException e) {
      e.printStackTrace();
      return false;
    }
  }

  public static List<Record> getByUserId(UUID userid) {
    try {
      return jdbcTemplate.query(
              "SELECT * FROM record "
                    + "WHERE recordid in (select recordid from saved where usersid=?)",
              new Object[]{ userid },
              new Record.RecordRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static List<Saved> getTop(int count) {
    try {
      return jdbcTemplate.query(
              "SELECT * FROM saved limit ?",
              new Object[]{ count },
              new Saved.SavedRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static boolean delete(UUID savedid) {
    try {
      return jdbcTemplate.update(
       "DELETE FROM saved "
          + "WHERE savedid = ? ",
        savedid
      ) > 0;
    } catch (DataAccessException e) {
      e.printStackTrace();
      return false;
    }
  }
}
