COMPOSE=docker compose -f infra/docker/docker-compose.yml

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps
sed -i 's|NEXT_PUBLIC_JOURNAL_SUBDOMAIN=.*|NEXT_PUBLIC_JOURNAL_SUBDOMAIN=jijosams|' infra/docker/docker.env
shell:
	$(COMPOSE) exec shadai-portal sh

rebuild:
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d --no-deps --force-recreate