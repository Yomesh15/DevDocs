import DocumentModel from "../models/document.model.js";

// Create Document
export const CreateDocument = async (req, res) => {
    try {
        const document = await DocumentModel.create({
            title: "Untitled Document",
            content: "",
            owner: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Document created successfully",
            document,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// get document of lloged in user
export const GetMyDocuments = async (req, res) => {
    try {
        const documents = await DocumentModel.find({
            owner: req.user._id,
        }).sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            documents,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// get parrgicular document
export const GetDocument = async (req, res) => {
    try {

        const { id } = req.params;

        const document = await DocumentModel.findOne({
            _id: id,
            owner: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.status(200).json({
            success: true,
            document,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// updadate document
export const UpdateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const document = await DocumentModel.findOneAndUpdate(
            {
                _id: id,
                owner: req.user._id,
            },
            {
                title,
                content,
            },
            {
                returnDocument: "after",
            }
        );

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Document updated successfully",
            document,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// ddelete document
export const DeleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await DocumentModel.findOneAndDelete({
            _id: id,
            owner: req.user._id,
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};