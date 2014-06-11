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
-- Name: regioes; Type: TABLE; Schema: alagamentos; Owner: cge; Tablespace: 
--

CREATE TABLE regioes (
    r_regiao character varying(10) NOT NULL,
    r_nome character varying(30) NOT NULL,
    r_zona character varying(10) NOT NULL,
    r_ultsituacao integer NOT NULL,
    r_ultsitdata timestamp without time zone NOT NULL
);


ALTER TABLE alagamentos.regioes OWNER TO cge;

--
-- Data for Name: regioes; Type: TABLE DATA; Schema: alagamentos; Owner: cge
--

COPY regioes (r_regiao, r_nome, r_zona, r_ultsituacao, r_ultsitdata) FROM stdin;
XX	Pontos a serem classificados	7	1	2013-09-23 00:11:23.552
JA	Jabaquara	6	1	2014-05-18 17:38:44.752
MP	São Miguel Paulista	4	1	2014-05-18 17:38:44.754
IT	Itaim Paulista	4	1	2014-05-18 17:38:44.755
VP	Vila Prudente	4	1	2014-05-18 17:38:44.755
AF	Aricanduva/ Vila Formosa	4	1	2014-05-18 17:38:44.756
BT	Butantã	3	1	2014-05-18 17:38:44.757
LA	Lapa	3	1	2014-05-18 17:38:44.758
MGP	Marginal Pinheiros	0	1	2014-05-18 17:38:44.759
PI	Pinheiros	3	1	2014-05-18 17:38:44.759
PA	Parelheiros	5	1	2014-05-18 17:38:44.76
CL	Campo Limpo	5	1	2014-05-18 17:38:44.761
MB	M'Boi Mirim	5	1	2014-05-18 17:38:44.762
CS	Cidade Dutra/ Socorro	5	1	2014-05-18 17:38:44.762
AD	Cidade Ademar	5	1	2014-05-18 17:38:44.763
SA	Santo Amaro	5	1	2014-05-18 17:38:44.764
VM	Vila Mariana	6	1	2014-05-18 17:38:44.765
IP	Ipiranga	6	1	2014-05-18 17:38:44.765
PE	Penha	4	1	2014-05-18 17:38:44.766
MO	Mooca	4	1	2014-05-18 17:38:44.767
SE	Sé	2	1	2014-05-18 17:38:44.768
MGT	Marginal Tietê	0	1	2014-05-18 17:38:44.768
PR	Perus	1	1	2014-05-18 17:38:44.769
FO	Freguesia do Ó	1	1	2014-05-18 17:38:44.77
CV	Casa Verde	1	1	2014-05-18 17:38:44.771
PJ	Pirituba/Jaraguá	1	1	2014-05-18 17:38:44.771
MG	Vila Maria/ Vila Guilherme	1	1	2014-05-18 17:38:44.772
JT	Jaçanã/ Tremembé	1	1	2014-05-18 17:38:44.773
ST	Santana	1	1	2014-05-18 17:38:44.774
EM	Ermelino Matarazzo	4	1	2014-05-18 17:38:44.774
IQ	Itaquera	4	1	2014-05-18 17:38:44.775
CT	Cidade Tiradentes	4	1	2014-05-18 17:38:44.776
GU	Guaianases	4	1	2014-05-18 17:38:44.777
SM	São Mateus	4	1	2014-05-18 17:38:44.777
\.


--
-- Name: r_idx1; Type: CONSTRAINT; Schema: alagamentos; Owner: cge; Tablespace: 
--

ALTER TABLE ONLY regioes
    ADD CONSTRAINT r_idx1 PRIMARY KEY (r_regiao);


--
-- Name: r_f_situacao; Type: FK CONSTRAINT; Schema: alagamentos; Owner: cge
--

ALTER TABLE ONLY regioes
    ADD CONSTRAINT r_f_situacao FOREIGN KEY (r_ultsituacao) REFERENCES situacoes(s_situacao);


--
-- Name: r_f_zona; Type: FK CONSTRAINT; Schema: alagamentos; Owner: cge
--

ALTER TABLE ONLY regioes
    ADD CONSTRAINT r_f_zona FOREIGN KEY (r_zona) REFERENCES zonas(z_zona);


--
-- Name: regioes; Type: ACL; Schema: alagamentos; Owner: cge
--

REVOKE ALL ON TABLE regioes FROM PUBLIC;
REVOKE ALL ON TABLE regioes FROM cge;
GRANT ALL ON TABLE regioes TO cge;


--
-- PostgreSQL database dump complete
--

