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
-- Name: zonas; Type: TABLE; Schema: alagamentos; Owner: pgsql; Tablespace: 
--

CREATE TABLE zonas (
    z_zona character varying(10) NOT NULL,
    z_nome character varying(30) NOT NULL
);


ALTER TABLE alagamentos.zonas OWNER TO pgsql;

--
-- Data for Name: zonas; Type: TABLE DATA; Schema: alagamentos; Owner: pgsql
--

COPY zonas (z_zona, z_nome) FROM stdin;
2	Centro
0	Marginais
1	Zona Norte
3	Zona Oeste
4	Zona Leste
5	Zona Sul
6	Zona Sudeste
7	Zona Indefinida
\.


--
-- Name: z_idx1; Type: CONSTRAINT; Schema: alagamentos; Owner: pgsql; Tablespace: 
--

ALTER TABLE ONLY zonas
    ADD CONSTRAINT z_idx1 PRIMARY KEY (z_zona);


--
-- Name: zonas; Type: ACL; Schema: alagamentos; Owner: pgsql
--

REVOKE ALL ON TABLE zonas FROM PUBLIC;
REVOKE ALL ON TABLE zonas FROM pgsql;
GRANT ALL ON TABLE zonas TO pgsql;
GRANT INSERT,SELECT,UPDATE,DELETE ON TABLE zonas TO cge;


--
-- PostgreSQL database dump complete
--

