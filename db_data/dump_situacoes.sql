--
-- PostgreSQL database dump
--

SET client_encoding = 'UTF8';
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = alagamentos, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: situacoes; Type: TABLE; Schema: alagamentos; Owner: ornitorrinko1; Tablespace: 
--

CREATE TABLE situacoes (
    s_situacao integer NOT NULL,
    s_nome character varying(30) NOT NULL,
    s_rgb character varying(10) NOT NULL
);


ALTER TABLE alagamentos.situacoes OWNER TO ornitorrinko1;

--
-- Data for Name: situacoes; Type: TABLE DATA; Schema: alagamentos; Owner: ornitorrinko1
--

COPY situacoes (s_situacao, s_nome, s_rgb) FROM stdin;
2	Atencao	ffff00
3	Alerta	ff0000
1	Observacao	cccccc
\.


--
-- Name: s_idx1; Type: CONSTRAINT; Schema: alagamentos; Owner: ornitorrinko1; Tablespace: 
--

ALTER TABLE ONLY situacoes
    ADD CONSTRAINT s_idx1 PRIMARY KEY (s_situacao);


--
-- Name: situacoes; Type: ACL; Schema: alagamentos; Owner: ornitorrinko1
--

REVOKE ALL ON TABLE situacoes FROM PUBLIC;
REVOKE ALL ON TABLE situacoes FROM ornitorrinko1;
GRANT ALL ON TABLE situacoes TO ornitorrinko1;


--
-- PostgreSQL database dump complete
--

