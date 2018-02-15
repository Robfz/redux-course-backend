### Setup DB

Create new user in MySQL:

```
CREATE USER 'redux'@'localhost' IDENTIFIED BY 'redux';
```

Create new database:

```
CREATE DATABASE cryptos;
```

Grant permissions to the new user:

```
GRANT ALL PRIVILEGES ON cryptos.* TO 'redux'@'localhost';
FLUSH PRIVILEGES;
```