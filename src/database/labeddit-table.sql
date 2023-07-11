-- Active: 1688421560542@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    comments INTEGER DEFAULT (0) NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL, 
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Flash", "homemmaisrapidovivo@email.com", "flash123", "NORMAL"),
	("u002", "Aquaman", "reidosmares@email.com", "aquaman123", "NORMAL"),
	("u003", "Superman", "filhodekrypton@email.com", "superman123", "ADMIN");

INSERT INTO posts (id, creator_id, comments, content)
VALUES 
    ("p001", "u001", 2, "Quem foi que comeu meu sanduche de atum que deixei na geladeira ?"),
    ("p002", "u001", 0, "O dia ta tão ruim que eu vou chamar esse dia de 'dia-reverso'!!"),
    ("p003", "u002", 0, "A Mera disse que eu preciso ter mais os pés no chão. Ela sabe vivemos no fundo do oceano né ?!"),
    ("p004", "u003", 0, "A Lois disse que quer conversar comigo quando chegar do Planeta Diario, tomara  que ela não queira ir jantar na França de novo !!");



INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u002", "p001", 1),
    ("u003", "p001", 1),
    ("u003", "p002", 1),
    ("u002", "p002", 0),
    ("u001", "p003", 0),
    ("u003", "p003", 0),
    ("u001", "p004", 1),
    ("u002", 'p004', 1);

INSERT INTO comments (id, post_id, creator_id, content)
VALUES 
    ("c001", "p001", "u002", "O SANDUICHE ERA DE ATUM ?!! Ai não ! Acho que vou chamar o 'raul' !! "),
    ("c002", "p001", "u003", "HAHAHAHAHAHAHA !! Ta ai um otimo furo !!");

INSERT INTO likes_dislikes_comments (user_id, comment_id, post_id, like)
VALUES
    ("u001", "c001", "p001", 1),
    ("u001", "c002", "p001", 1),
    ("u003", "c001", "p001", 1),
    ("u002", "c002", "p001", 0);

