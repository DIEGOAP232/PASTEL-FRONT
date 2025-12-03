import { useEffect, useState } from "react";
import api from "../services/api";
import "./RevisionPagos.css";

function RevisionPagos() {
  const [pagos, setPagos] = useState([]);

  const cargarPagos = async () => {
    const res = await api.get("/api/pagos/pendientes");
    setPagos(res.data);
  };

  const aprobar = async (id) => {
    await api.put(`/api/pagos/${id}/aprobar`);
    cargarPagos();
    alert("Pago aprobado correctamente.");
  };

  const rechazar = async (id) => {
    await api.put(`/api/pagos/${id}/rechazar`);
    cargarPagos();
    alert("Pago rechazado.");
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  return (
    <div className="revision-container">
      <h1>Pagos pendientes de revisión</h1>

      <div className="pagos-grid">
        {pagos.map((pago) => (
          <div key={pago.idPago} className="pago-card">
            <h3>Pago #{pago.idPago}</h3>

            <p><strong>Pedido:</strong> {pago.pedido.idPedido}</p>
            <p><strong>Método:</strong> {pago.metodo}</p>
            <p><strong>Monto:</strong> S/ {pago.monto}</p>
            <p><strong>Fecha:</strong> {pago.fecha}</p>

            <div className="captura-box">
              <img src={pago.captura} alt="captura" />
            </div>

            <div className="acciones">
              <button className="btn-approve" onClick={() => aprobar(pago.idPago)}>
                Aprobar
              </button>

              <button className="btn-reject" onClick={() => rechazar(pago.idPago)}>
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RevisionPagos;
