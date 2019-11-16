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
public class Files {

  public UUID filesid = UUID.randomUUID();
  public byte[] data = null;

  private static JdbcTemplate jdbcTemplate;

  @Autowired
  public void setDataSource(DataSource dataSource) {
    jdbcTemplate = new JdbcTemplate(dataSource);
  }

  public static class FilesRowMapper implements RowMapper<Files> {
    @Override
    public Files mapRow(ResultSet rs, int rowNum) throws SQLException {
      final Files files = new Files();
      files.filesid = rs.getObject("filesid", UUID.class);
      files.data = rs.getBytes("data");
      return files;
    }
    
  }

  public static Files getById(UUID id) {
    try {
      return jdbcTemplate.queryForObject(
          "SELECT * FROM files WHERE "
          + "files.filesid=?",
          new Object[]{ id }, 
          new FilesRowMapper()
      );
    } catch (DataAccessException e) {
      e.printStackTrace();
      return null;
    }
  }

  public boolean create() {
    try {
      return jdbcTemplate.update(
          "INSERT INTO files "
          + "(filesid, data) "
          + "VALUES (?, ?)",
         filesid, data
      ) > 0;
    } catch (DataAccessException e) {
      e.printStackTrace();
      return false;
    }
  }

}
