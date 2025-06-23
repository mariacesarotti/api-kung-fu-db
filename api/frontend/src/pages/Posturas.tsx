import { useEffect, useState } from "react";
import { getPosturas } from "../services/posturasService";
import { PosturaModel } from "../types/posturaTypes";
import PosturaCard from "../components/MainContent/PosturaCard/PosturaCard";
import PosturaImage from "../components/MainContent/PosturaImage/PosturaImage";
import Kati from "../components/MainContent/Kati/Kati";
import ReactPaginate from "react-paginate";
import styles from "./Posturas.module.scss";
import "../styles/index.scss";

const ITEMS_PER_PAGE = 5;

const Posturas = () => {
  const [posturas, setPosturas] = useState<PosturaModel[]>([]);
  const [selectedFaixa, setSelectedFaixa] = useState<string | null>(null);
  const [selectedPostura, setSelectedPostura] = useState<PosturaModel | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getPosturas().then((data) => {
      setPosturas(data);
    });
  }, []);

  const faixas = Array.from(new Set(posturas.map((postura) => postura.faixa)));
  const filteredPosturas = selectedFaixa
    ? posturas.filter((postura) => postura.faixa === selectedFaixa)
    : [];
  const totalPages = Math.ceil(filteredPosturas.length / ITEMS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <section>
      <div className={styles.posturasTopContainer}>
        <div className={styles.headerContainerLeft}>
          {selectedFaixa ? (
            <>
              <h1>
                {selectedPostura ? selectedPostura.kati : "selecione uma postura para ver em play"}
              </h1>
              <p>
                {selectedPostura
                  ? selectedPostura.nomekatiportugues
                  : ""}
              </p>
            </>
          ) : (
            <>
              <h1>catálogo interativo de posturas</h1>
              <p>visualize as posições de cada kati organizadas por faixa</p>
            </>
          )}
        </div>

        <div className={styles.headerContainerRight}>
          <select
            value={selectedFaixa || ""}
            onChange={(e) => {
              setSelectedFaixa(e.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="">selecione a faixa</option>
            {faixas.map((faixa) => (
              <option key={faixa} value={faixa}>
                {faixa}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedFaixa && (
        <div className={styles.mainContainer}>
          <div className={styles.selectedPosturaContainer}>
            {selectedPostura ? (
              <>
                <PosturaImage
                  imagem={selectedPostura.imagem}
                  gif={selectedPostura.gif}
                  autoplay
                />
                <Kati
                  nome={selectedPostura.nome}
                  faixa={selectedPostura.faixa}
                />
              </>
            ) : (
              ""
            )}
          </div>

          <div className={styles.posturasContainer}>
            {filteredPosturas
              .slice(
                currentPage * ITEMS_PER_PAGE,
                (currentPage + 1) * ITEMS_PER_PAGE
              )
              .map((postura, index) => (
                <div
                  key={postura.id}
                  onClick={() => setSelectedPostura(postura)}
                >
                  <PosturaCard
                    postura={postura}
                    reverseLayout={index % 2 !== 0}
                  />
                </div>
              ))}

            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={styles.paginationContainer}
              activeClassName={styles.activePage}
              previousClassName={styles.previousButton}
              nextClassName={styles.nextButton}
              disabledClassName={styles.disabledButton}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Posturas;
