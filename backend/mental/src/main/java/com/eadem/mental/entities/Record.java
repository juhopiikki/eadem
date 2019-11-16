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
public class Record {

  public UUID recordid = UUID.randomUUID();
  public UUID usersid = null;
  public int likecount = 0;
  public String filepath = "";

  private static JdbcTemplate jdbcTemplate;

  @Autowired
  public void setDataSource(DataSource dataSource) {
    jdbcTemplate = new JdbcTemplate(dataSource);
  }

  public static class RecordRowMapper implements RowMapper<Record> {
    @Override
    public Record mapRow(ResultSet rs, int rowNum) throws SQLException {
      final Record record = new Record();
      record.recordid = rs.getObject("recordid", UUID.class);
      record.usersid = rs.getObject("usersid", UUID.class);
      record.likecount = rs.getInt("likecount");
      record.filepath = rs.getString("filepath");
      return record;
    }
    
  }

  public static Record getById(UUID id) {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM record WHERE "
          + "record.recordid=?",
          new Object[]{ id }, 
          new RecordRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public static Record getRandom() {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM record ORDER BY random() LIMIT 1",
          new Object[]{ }, 
          new RecordRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public boolean create() {
    try {
      return jdbcTemplate.update(
          "INSERT INTO record "
          + "(recordid, usersid, likecount, filepath) "
          + "VALUES (?, ?, ?, ?)",
         recordid, usersid, likecount, filepath
      ) > 0;
    } catch (DataAccessException e) {
      e.printStackTrace();
      return false;
    }
  }
}
