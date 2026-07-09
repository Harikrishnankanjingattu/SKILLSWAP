const prisma = require('../config/prisma');

const getUserProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                bio: true,
                location: true,
                avatarUrl: true,
                createdAt: true,
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("Get User Profile Error: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getUserProfile
};
