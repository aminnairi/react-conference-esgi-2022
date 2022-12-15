# react-esgi-conference-2022

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GNU/Make](https://www.gnu.org/software/make/)

## Usage

### Setup

```bash
cp .env.example .env
```

### Commands

Command | Description
---|---
`make development` | Development server
`make production` | Production build
`make install` | Dependencies installation (done with `make development` & `make production`)
`make start` | Docker Compose startup (done with `make install`)
`make stop` | Docker Compose shutdown
`make restart` | Docker Compose restart