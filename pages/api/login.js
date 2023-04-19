export default function handler(req, res) {
    // res.status(200).json({ SUCCESS: true });
    setTimeout(() => res.status(200).json({ SUCCESS: true }), 500);
    ;
}
