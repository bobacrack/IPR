package org.example;

public class LikeEntry {
    private Integer mId;
    private Integer mUidLiker;
    private Integer mUidLiked;

    public LikeEntry(Intger aId, Integer aUidLiker, Integer aUidLiked) {
        mId = aId;
        mUidLiker = aUidLiker;
        mUidLiked = aUidLiked;
    }

    public void update(Integer aUidLiker, Integer aUidLiked) {
        mUidLiker = aUidLiker;
        mUidLiked = aUidLiked;

    }

    public Integer getmId() {
        return mId;
    }

    @Override
    public String toString() {
        return ("{\n\t\"Messag\": {\n\t\t\"id\":" + mId + "\n\t\t\"UidSender\":" + mUidLiker
                + "\n\t\t\"UidReceiver\":\""
                + mUidLiked
                + "\"\n\t}\n}");
    }
}
