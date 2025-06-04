# Moto Backend

Moto Backend to aplikacja serwerowa napisana w TypeScript z wykorzystaniem frameworka NestJS. Projekt obsługuje uwierzytelnianie użytkowników za pomocą JWT oraz zarządzanie danymi użytkowników przy użyciu Prisma ORM i PostgreSQL.

## Funkcjonalności

- Rejestracja użytkowników
- Logowanie użytkowników z generowaniem tokenów JWT
- Endpointy chronione za pomocą strategii JWT
- Obsługa refresh tokenów
- Zarządzanie danymi użytkowników (np. pobieranie danych konta)

## Technologie

- **NestJS**: Framework do budowy aplikacji serwerowych
- **TypeScript**: Język programowania
- **Prisma ORM**: Do zarządzania bazą danych PostgreSQL
- **PostgreSQL**: Relacyjna baza danych
- **Passport.js**: Obsługa strategii uwierzytelniania
- **JWT**: Tokeny do uwierzytelniania i autoryzacji
