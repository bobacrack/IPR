package org.example;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class GuestBookRessource {

    private Map<Integer, UserEntry> mUserEntries;

    public GuestBookRessource() {
        mUserEntries = new HashMap<Integer, UserEntry>();
        mUserEntries.put(1, new UserEntry("Nils", "Entry", "CONTENET JO"));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/entries", produces = MediaType.APPLICATION_JSON)
    public UserEntry createEntry(@RequestBody UserEntry aEntry) {
        if (!mUserEntries.containsKey(aEntry.getmId())) {
            mUserEntries.put(aEntry.getmId(), aEntry);
            return aEntry;
        } else
            throw new IllegalArgumentException("id in use " + aEntry.getmId());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/entries", produces = MediaType.APPLICATION_JSON)
    public Map<Integer, UserEntry> readNotes() {
        return mUserEntries;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/entries/{id}", produces = MediaType.APPLICATION_JSON)
    public UserEntry readNote(@PathVariable("id") Integer aId) {
        if (mUserEntries.containsKey(aId))
            return mUserEntries.get(aId);
        else
            throw new IllegalArgumentException("Innvalid id " + aId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/entries/{id}", produces = MediaType.APPLICATION_JSON)
    public UserEntry updateNote(@RequestBody UserEntry aNote) {
        if (mUserEntries.containsKey(aNote.getmId())) {
            mUserEntries.put(aNote.getmId(), aNote);
            return aNote;
        } else
            throw new IllegalArgumentException("Invalid id " + aNote.getmId());
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/entries/{id}", produces = MediaType.APPLICATION_JSON)
    public void deleteNote(@PathVariable("id") Integer aId) {
        if (mUserEntries.containsKey(aId))
            mUserEntries.remove(aId);
        else
            throw new IllegalArgumentException("Invalid id " + aId);
    }

    @ExceptionHandler
    public void handleIllegalArgunmntException(IllegalArgumentException aExcpetion, HttpServletResponse aResponse)
            throws IOException {
        aResponse.sendError(HttpStatus.BAD_REQUEST.value(), aExcpetion.toString());
    }

}