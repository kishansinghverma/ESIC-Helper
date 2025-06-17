export const Modal = `
	<div id="modal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">ESIC Form Helper</h2>
            </div>

            <div class="modal-body">
                <div class="input-group">
                    <input type="file" id="fileInput" class="file-input">
                </div>

				<div id="message" class="message">
                    Please select a file to upload.
                </div>

                <div class="data-table-container">
                    <table class="data-table" id="dataTable">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Site</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal-footer">
                <button id="cancelBtn" class="cancel-btn">
                    Cancel
                </button>
                <button id="proceedBtn" class="proceed-btn" disabled>
                    Proceed
                </button>
            </div>
        </div>
    </div>
`;