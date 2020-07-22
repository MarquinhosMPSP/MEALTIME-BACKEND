include .env

.PHONY: migrate

migrate: 
	bash db-setup

.PHONY: rollback

rollback:
	bash db-unmount

